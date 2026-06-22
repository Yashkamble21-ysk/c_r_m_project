<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    /**
     * GET /api/emails
     */
    public function index(): JsonResponse
    {
        try {

            $emails = Cache::remember('crm_emails', 60, function () {

                return Email::select([
                    'id',
                    'subject',
                    'recipient_name',
                    'recipient_email',
                    'sender_name',
                    'sender_email',
                    'body',
                    'status',
                    'sent_at',
                    'created_at'
                ])
                ->latest()
                ->get();

            });

            return response()->json([
                'status'  => true,
                'message' => 'Emails fetched successfully.',
                'data'    => $emails,
                'total'   => $emails->count(),
            ], 200);

        } catch (\Exception $e) {

            Log::error($e);

            return response()->json([
                'status'  => false,
                'message' => 'Failed to fetch emails.',
                'error'   => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile(),
            ], 500);

        }
    }

    /**
     * POST /api/emails/send
     */
    public function send(Request $request): JsonResponse
    {
        try {

            $validated = $request->validate([
                'to'      => 'required|email|max:255',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
                'status'  => 'nullable|in:sent,draft,pending,failed',
            ]);

            $status = $validated['status'] ?? 'sent';

            // Send Email
            if ($status === 'sent') {

                Mail::raw($validated['message'], function ($mail) use ($validated) {

                    $mail->to($validated['to'])
                         ->subject($validated['subject']);

                });

            }

            // Save Email History
            $email = Email::create([
                'subject'          => $validated['subject'],
                'recipient_name'   => 'Customer',
                'recipient_email'  => $validated['to'],
                'sender_name'      => 'Majestic Realties',
                'sender_email'     => 'admin@majesticrealties.com',
                'body'             => $validated['message'],
                'status'           => $status,
                'sent_at'          => $status === 'sent' ? now() : null,
            ]);

            // Clear Cache
            Cache::forget('crm_emails');

            return response()->json([
                'status'  => true,
                'message' => $status === 'draft'
                    ? 'Draft saved successfully.'
                    : 'Email sent successfully.',
                'data'    => $email,
            ], 200);

        } catch (\Exception $e) {

            Log::error($e);

            return response()->json([
                'status'  => false,
                'message' => 'Failed to send email.',
                'error'   => $e->getMessage(),
                'line'    => $e->getLine(),
                'file'    => $e->getFile(),
            ], 500);

        }
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * GET /api/contacts
     */
    public function index(): JsonResponse
    {
        try {

            $contacts = Contact::select([
                    'id',
                    'full_name as name',
                    'phone',
                    'email',
                    'designation',
                    'company',
                    'city',
                    'state',
                    'status',
                    'created_at',
                    'updated_at'
                ])
                ->latest()
                ->get();

            return response()->json([
                'status'  => true,
                'message' => 'Contacts fetched successfully.',
                'data'    => $contacts,
                'total'   => $contacts->count(),
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to fetch contacts.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * GET /api/contacts/{id}
     */
    public function show($id): JsonResponse
    {
        try {

            $contact = Contact::select([
                    'id',
                    'full_name as name',
                    'phone',
                    'email',
                    'designation',
                    'company',
                    'city',
                    'state',
                    'status',
                    'created_at',
                    'updated_at'
                ])
                ->findOrFail($id);

            return response()->json([
                'status'  => true,
                'message' => 'Contact fetched successfully.',
                'data'    => $contact,
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Contact not found.',
                'error'   => $e->getMessage(),
            ], 404);

        }
    }

    /**
     * POST /api/contacts  (ADDED FROM OLD CONTROLLER)
     */
    public function store(Request $request): JsonResponse
    {
        try {

            $validated = $request->validate([
                'full_name'   => 'required|string|max:255',
                'phone'       => 'required|string|max:255',
                'email'       => 'nullable|email|max:255',
                'company'     => 'nullable|string|max:255',
                'designation' => 'nullable|string|max:255',
                'city'        => 'nullable|string|max:255',
                'state'       => 'nullable|string|max:255',
                'status'      => 'required|in:active,inactive',
            ]);

            $contact = Contact::create($validated);

            return response()->json([
                'status'  => true,
                'message' => 'Contact added successfully',
                'data'    => $contact
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to create contact.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
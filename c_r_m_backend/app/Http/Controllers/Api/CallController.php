<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Call;
use Illuminate\Http\JsonResponse;

class CallController extends Controller
{
    /**
     * GET /api/calls
     */
    public function index(): JsonResponse
    {
        try {

            $calls = Call::select([
                    'id',
                    'caller_name',
                    'caller_number',
                    'receiver_name',
                    'receiver_number',
                    'duration',
                    'status',
                    'direction',
                    'notes',
                    'call_time',
                    'created_at',
                    'updated_at'
                ])
                ->latest('call_time')
                ->get();

            return response()->json([
                'status'  => true,
                'message' => 'Calls fetched successfully.',
                'data'    => $calls,
                'total'   => $calls->count(),
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to fetch calls.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }
}
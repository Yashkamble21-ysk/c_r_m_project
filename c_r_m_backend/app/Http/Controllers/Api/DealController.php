<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use Illuminate\Http\JsonResponse;

class DealController extends Controller
{
    /**
     * GET /api/deals
     */
    public function index(): JsonResponse
    {
        try {

            $deals = Deal::select([
                    'id',
                    'deal_name',
                    'client_name',
                    'project',
                    'deal_value',
                    'stage',
                    'expected_close',
                    'created_at'
                ])
                ->latest()
                ->get();

            return response()->json([
                'status' => true,
                'data'   => $deals,
                'total'  => $deals->count(),
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to fetch deals.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }
}
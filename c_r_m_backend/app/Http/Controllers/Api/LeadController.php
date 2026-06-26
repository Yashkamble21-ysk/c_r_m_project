<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Lead;

class LeadController extends Controller
{
    /**
     * GET /api/leads
     */
    public function index()
    {
        $leads = Cache::remember('crm_leads', 60, function () {
            return Lead::select([
                'id',
                'lead_id',
                'title',
                'customer_name',
                'phone',
                'email',
                'project',
                'source',
                'status',
                'assigned_to',
                'created_date',
                'follow_up_date',
                'budget',
                'notes',
                'created_at'
            ])
            ->orderByDesc('created_at')
            ->get();
        });

        return response()->json([
            'status' => true,
            'data' => $leads
        ]);
    }

    /**
     * GET /api/leads/{id}
     */
    public function show($id)
    {
        $lead = Lead::findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $lead
        ]);
    }

    /**
     * POST /api/leads
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:255',
            'customer_name'   => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'required|email|max:255',
            'project'         => 'required|string|max:255',
            'source'          => 'required|string|max:255',
            'status'          => 'nullable|string|max:255',
            'assigned_to'     => 'nullable|string|max:255',
            'created_date'    => 'required|date',
            'follow_up_date'  => 'nullable|date',
            'budget'          => 'nullable|string|max:255',
            'notes'           => 'nullable|string',
        ]);

        do {
            $leadId = 'LD' . random_int(100000, 999999);
        } while (Lead::where('lead_id', $leadId)->exists());

        $validated['lead_id'] = $leadId;
        $validated['status'] = $validated['status'] ?? 'new';

        $lead = Lead::create($validated);

        Cache::forget('crm_leads');

        return response()->json([
            'status' => true,
            'message' => 'Lead Created Successfully',
            'data' => $lead
        ], 201);
    }

    /**
     * PUT /api/leads/{id}
     */
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $validated = $request->validate([
            'title'          => 'sometimes|string|max:255',
            'customer_name'  => 'sometimes|string|max:255',
            'phone'          => 'sometimes|string|max:20',
            'email'          => 'sometimes|email|max:255',
            'project'        => 'sometimes|string|max:255',
            'source'         => 'sometimes|string|max:255',
            'status'         => 'sometimes|string|max:255',
            'assigned_to'    => 'nullable|string|max:255',
            'created_date'   => 'sometimes|date',
            'follow_up_date' => 'nullable|date',
            'budget'         => 'nullable|string|max:255',
            'notes'          => 'nullable|string',
        ]);

        $lead->update($validated);

        Cache::forget('crm_leads');

        return response()->json([
            'status' => true,
            'message' => 'Lead Updated Successfully',
            'data' => $lead
        ]);
    }

    /**
     * DELETE /api/leads/{id}
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);

        $lead->delete();

        Cache::forget('crm_leads');

        return response()->json([
            'status' => true,
            'message' => 'Lead Deleted Successfully'
        ]);
    }

    /**
     * POST /api/leads/{id}/note
     */
    public function addNote(Request $request, $id)
    {
        $request->validate([
            'notes' => 'required|string'
        ]);

        $lead = Lead::findOrFail($id);

        $lead->update([
            'notes' => $request->notes
        ]);

        Cache::forget('crm_leads');

        return response()->json([
            'status' => true,
            'message' => 'Note Saved Successfully'
        ]);
    }
}
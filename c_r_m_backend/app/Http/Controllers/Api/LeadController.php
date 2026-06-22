<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lead;

class LeadController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Lead::all()
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'status' => true,
            'data' => Lead::findOrFail($id)
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'customer_name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'email' => 'required|email',
        'project' => 'required|string|max:255',
        'source' => 'required|string|max:255',
        'status' => 'nullable|string|max:255',
        'assigned_to' => 'nullable|string|max:255',
        'created_date' => 'required|date',
        'follow_up_date' => 'nullable|date',
        'budget' => 'nullable|string|max:255',
        'notes' => 'nullable|string',
    ]);

    // Generate unique Lead ID
    do {
        $leadId = 'LD' . rand(100000, 999999);
    } while (Lead::where('lead_id', $leadId)->exists());

    $lead = Lead::create([
        'lead_id' => $leadId,
        'title' => $request->title,
        'customer_name' => $request->customer_name,
        'phone' => $request->phone,
        'email' => $request->email,
        'project' => $request->project,
        'source' => $request->source,
        'status' => $request->status ?? 'new',
        'assigned_to' => $request->assigned_to,
        'created_date' => $request->created_date,
        'follow_up_date' => $request->follow_up_date,
        'budget' => $request->budget,
        'notes' => $request->notes,
    ]);

    return response()->json([
        'status' => true,
        'message' => 'Lead Created Successfully',
        'data' => $lead
    ], 201);
}
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $lead->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Lead Updated Successfully',
            'data' => $lead
        ]);
    }

    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);

        $lead->delete();

        return response()->json([
            'status' => true,
            'message' => 'Lead Deleted Successfully'
        ]);
    }

    public function addNote(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $lead->notes = $request->notes;
        $lead->save();

        return response()->json([
            'status' => true,
            'message' => 'Note Saved Successfully'
        ]);
    }
}
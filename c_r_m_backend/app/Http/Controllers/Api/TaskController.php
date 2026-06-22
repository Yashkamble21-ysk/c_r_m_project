<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class TaskController extends Controller
{
    /**
     * GET /api/tasks
     */
    public function index(): JsonResponse
    {
        try {

            $tasks = Cache::remember('crm_tasks', 60, function () {

                return Task::select([
                    'id',
                    'title',
                    'description',
                    'assigned_to',
                    'related_to',
                    'priority',
                    'status',
                    'due_date',
                    'created_at'
                ])
                ->latest()
                ->get();

            });

            return response()->json([
                'status'  => true,
                'message' => 'Tasks fetched successfully.',
                'data'    => $tasks,
                'total'   => $tasks->count(),
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to fetch tasks.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * POST /api/tasks
     */
    public function store(Request $request): JsonResponse
    {
        try {

            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string',
                'assigned_to' => 'nullable|string|max:255',
                'related_to'  => 'nullable|string|max:255',
                'priority'    => 'nullable|in:low,medium,high',
                'status'      => 'nullable|in:pending,in_progress,completed,overdue',
                'due_date'    => 'nullable|date',
            ]);

            $task = Task::create($validated);

            Cache::forget('crm_tasks');

            return response()->json([
                'status'  => true,
                'message' => 'Task created successfully.',
                'data'    => $task,
            ], 201);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to create task.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * GET /api/tasks/{id}
     */
    public function show($id): JsonResponse
    {
        try {

            $task = Task::findOrFail($id);

            return response()->json([
                'status'  => true,
                'message' => 'Task fetched successfully.',
                'data'    => $task,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Task not found.',
                'error'   => $e->getMessage(),
            ], 404);

        }
    }

    /**
     * PUT /api/tasks/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {

            $task = Task::findOrFail($id);

            $validated = $request->validate([
                'title'       => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'assigned_to' => 'nullable|string|max:255',
                'related_to'  => 'nullable|string|max:255',
                'priority'    => 'nullable|in:low,medium,high',
                'status'      => 'nullable|in:pending,in_progress,completed,overdue',
                'due_date'    => 'nullable|date',
            ]);

            $task->update($validated);

            Cache::forget('crm_tasks');

            return response()->json([
                'status'  => true,
                'message' => 'Task updated successfully.',
                'data'    => $task,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to update task.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }

    /**
     * DELETE /api/tasks/{id}
     */
    public function destroy($id): JsonResponse
    {
        try {

            $task = Task::findOrFail($id);

            $task->delete();

            Cache::forget('crm_tasks');

            return response()->json([
                'status'  => true,
                'message' => 'Task deleted successfully.',
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status'  => false,
                'message' => 'Failed to delete task.',
                'error'   => $e->getMessage(),
            ], 500);

        }
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            [
                'title'       => 'Follow up with Rajesh Kumar for Site Visit',
                'description' => 'Schedule a site visit for Sector-7 plots and confirm availability.',
                'assigned_to' => 'Rahul Sharma',
                'related_to'  => 'Lead - Rajesh Kumar',
                'priority'    => 'high',
                'status'      => 'pending',
                'due_date'    => '2024-11-20',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Send RERA Documents to Priya Mehta',
                'description' => 'Email the RERA registration certificate and title deed documents.',
                'assigned_to' => 'Anita Verma',
                'related_to'  => 'Deal - Green Valley Phase II',
                'priority'    => 'high',
                'status'      => 'in_progress',
                'due_date'    => '2024-11-18',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Prepare Plot Pricing Report for Q4',
                'description' => 'Compile the latest pricing data for all available plots.',
                'assigned_to' => 'Vikram Singh',
                'related_to'  => 'Reports - Q4 2024',
                'priority'    => 'medium',
                'status'      => 'pending',
                'due_date'    => '2024-11-25',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Call Arun Patel Regarding Payment Plan',
                'description' => 'Discuss EMI options and upfront payment discounts.',
                'assigned_to' => 'Rahul Sharma',
                'related_to'  => 'Lead - Arun Patel',
                'priority'    => 'medium',
                'status'      => 'completed',
                'due_date'    => '2024-11-15',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Update CRM with New Inquiry Data',
                'description' => 'Add all new inquiries received this week into the CRM system.',
                'assigned_to' => 'Anita Verma',
                'related_to'  => 'CRM - Data Update',
                'priority'    => 'low',
                'status'      => 'completed',
                'due_date'    => '2024-11-14',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Arrange Legal Verification for Plot B-204',
                'description' => 'Coordinate with the legal team for title deed verification.',
                'assigned_to' => 'Vikram Singh',
                'related_to'  => 'Plot - B-204 Sector 7',
                'priority'    => 'high',
                'status'      => 'overdue',
                'due_date'    => '2024-11-10',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('tasks')->insert($tasks);
    }
}
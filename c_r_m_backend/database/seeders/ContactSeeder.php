<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::create([
            'full_name' => 'Rahul Patil',
            'phone' => '9876543210',
            'email' => 'rahul@gmail.com',
            'company' => 'Majestic Realty',
            'designation' => 'Investor',
            'city' => 'Pune',
            'state' => 'Maharashtra',
            'status' => 'active'
        ]);

        Contact::create([
            'full_name' => 'Priya Sharma',
            'phone' => '9876543211',
            'email' => 'priya@gmail.com',
            'company' => 'Green Valley',
            'designation' => 'Business Owner',
            'city' => 'Mumbai',
            'state' => 'Maharashtra',
            'status' => 'active'
        ]);

        Contact::create([
            'full_name' => 'Vikram Mehta',
            'phone' => '9876543212',
            'email' => 'vikram@gmail.com',
            'company' => 'Apex Group',
            'designation' => 'Director',
            'city' => 'Pune',
            'state' => 'Maharashtra',
            'status' => 'inactive'
        ]);
    }
}
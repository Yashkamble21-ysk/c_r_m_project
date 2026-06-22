<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;

class AccountSeeder extends Seeder
{
    public function run(): void
    {
        Account::create([
            'account_name'=>'Majestic Residency',
            'contact_person'=>'Rahul Patil',
            'phone'=>'9876543210',
            'email'=>'rahul@gmail.com',
            'company'=>'Majestic Realty',
            'industry'=>'Real Estate',
            'annual_revenue'=>85000000,
            'website'=>'www.majesticrealty.com',
            'city'=>'Pune',
            'state'=>'Maharashtra',
            'country'=>'India',
            'status'=>'active'
        ]);

        Account::create([
            'account_name'=>'Green Valley',
            'contact_person'=>'Priya Sharma',
            'phone'=>'9876500000',
            'email'=>'priya@gmail.com',
            'company'=>'Green Valley Developers',
            'industry'=>'Construction',
            'annual_revenue'=>120000000,
            'website'=>'www.greenvalley.com',
            'city'=>'Mumbai',
            'state'=>'Maharashtra',
            'country'=>'India',
            'status'=>'active'
        ]);

        Account::create([
            'account_name'=>'Apex Botanical',
            'contact_person'=>'Vikram Mehta',
            'phone'=>'9898989898',
            'email'=>'vikram@gmail.com',
            'company'=>'Apex Builders',
            'industry'=>'Infrastructure',
            'annual_revenue'=>50000000,
            'website'=>'www.apex.com',
            'city'=>'Nashik',
            'state'=>'Maharashtra',
            'country'=>'India',
            'status'=>'prospect'
        ]);
    }
}
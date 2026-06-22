<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = [

        'account_name',
        'contact_person',
        'phone',
        'email',
        'company',
        'industry',
        'annual_revenue',
        'website',
        'city',
        'state',
        'country',
        'status'

    ];
}
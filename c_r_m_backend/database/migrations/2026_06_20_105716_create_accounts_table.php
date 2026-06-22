<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();

            $table->string('account_name');
            $table->string('contact_person');
            $table->string('phone');
            $table->string('email')->unique();

            $table->string('company');
            $table->string('industry');

            $table->decimal('annual_revenue',15,2);

            $table->string('website')->nullable();

            $table->string('city');
            $table->string('state');
            $table->string('country');

            $table->enum('status',[
                'active',
                'inactive',
                'prospect'
            ])->default('active');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('leads', function (Blueprint $table) {

        $table->id();

        $table->string('lead_id')->unique();

        $table->string('title');

        $table->string('customer_name');

        $table->string('phone');

        $table->string('email');

        $table->string('project');

        $table->string('source');

        $table->string('status')->default('new');

        $table->string('assigned_to')->nullable();

        $table->date('created_date');

        $table->date('follow_up_date')->nullable();

        $table->string('budget')->nullable();

        $table->text('notes')->nullable();

        $table->timestamps();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};

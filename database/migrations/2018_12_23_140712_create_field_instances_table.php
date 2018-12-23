<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFieldInstancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('field_instances', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('group')->nullable();
            $table->text('description')->nullable();
            $table->text('options')->nullable();
            $table->integer('field_id')->unsigned();
            $table->integer('weight')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('field_instances');
    }
}

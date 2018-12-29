<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeInstancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_instances', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('machine_name');
            $table->text('description')->nullable();
            $table->text('options')->nullable();
            $table->integer('type_id')->unsigned();
            $table->integer('project_id')->unsigned();
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
        Schema::dropIfExists('type_instances');
    }
}

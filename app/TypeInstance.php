<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeInstance extends Model
{
    protected $fillable = [
        'name',
        'machine_name',
        'description',
        'options',
        'type_id',
        'project_id',
    ];
}

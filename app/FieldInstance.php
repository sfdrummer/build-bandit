<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FieldInstance extends Model
{
    protected $fillable = [
        'name',
        'machine_name',
        'group',
        'description',
        'options',
        'weight',
        'field_id',
        'project_id',
        'type_instance_id'
    ];
}

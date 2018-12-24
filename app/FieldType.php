<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FieldType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'group',
        'module_id',
        'cms_id'
    ];
}

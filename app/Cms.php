<?php

namespace App;

use App\FieldType;
use App\Module;
use App\Project;
use App\Type;
use Illuminate\Database\Eloquent\Model;

class Cms extends Model
{
    protected $guarded = [];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function fieldTypes()
    {
        return $this->hasMany(FieldType::class);
    }

    public function types()
    {
        return $this->hasMany(Type::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}

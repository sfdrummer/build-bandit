<?php

namespace App;

use App\Project;
use Illuminate\Database\Eloquent\Model;

class Cms extends Model
{
    protected $guarded = [];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}

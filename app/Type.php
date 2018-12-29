<?php

namespace App;

use App\Type;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $fillable = ['name', 'cms_id'];

    public function cms()
    {
        return $this->belongsTo(Type::class);
    }
}

<?php

namespace App;

use App\Cms;
use App\FieldType;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    public function cms()
    {
        return $this->belongsTo(Cms::class);
    }

    public function getFieldsForCms()
    {
        return FieldType::where('cms_id', $this->cms->id)->get();
    }

    public function getTypesForCms()
    {
        return Type::where('cms_id', $this->cms->id)->get();
    }
}

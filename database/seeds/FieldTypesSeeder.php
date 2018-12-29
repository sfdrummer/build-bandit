<?php

use App\FieldType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FieldTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FieldType::truncate();
        FieldType::unguard();

        $fieldTypes = [
            ['id' => 21, 'name' => 'Boolean', 'group' => 'General', 'cms_id' => 1],
            ['id' => 22, 'name' => 'Date', 'group' => 'General', 'cms_id' => 1],
            ['id' => 23, 'name' => 'Email', 'group' => 'General', 'cms_id' => 1],
            ['id' => 24, 'name' => 'Link', 'group' => 'General', 'cms_id' => 1],
            ['id' => 25, 'name' => 'Timestamp', 'group' => 'General', 'cms_id' => 1],
            ['id' => 26, 'name' => 'Number (decimal)', 'group' => 'Number', 'cms_id' => 1],
            ['id' => 27, 'name' => 'Number (float)', 'group' => 'Number', 'cms_id' => 1],
            ['id' => 28, 'name' => 'Number (integer)', 'group' => 'Number', 'cms_id' => 1],
            ['id' => 29, 'name' => 'List (float)', 'group' => 'Number', 'cms_id' => 1],
            ['id' => 30, 'name' => 'List (integer)', 'group' => 'Number', 'cms_id' => 1],
            ['id' => 31, 'name' => 'Content', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 32, 'name' => 'File', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 33, 'name' => 'Image', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 34, 'name' => 'Media', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 35, 'name' => 'Taxonomy term', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 36, 'name' => 'User', 'group' => 'Reference', 'cms_id' => 1],
            ['id' => 37, 'name' => 'List (text)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 38, 'name' => 'Text (formatted)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 39, 'name' => 'Text (formatted, long)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 40, 'name' => 'Text (formatted, long, with summary)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 41, 'name' => 'Text (plain)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 42, 'name' => 'Text (plain, long)', 'group' => 'Text', 'cms_id' => 1],
            ['id' => 43, 'name' => 'Geolocation', 'group' => 'General', 'module_id' => 2, 'cms_id' => 1],
            ['id' => 44, 'name' => 'Paragraph', 'group' => 'Reference revisions', 'module_id' => 1, 'cms_id' => 1],
            ['id' => 46, 'name' => 'Meta tags', 'group' => 'General', 'module_id' => 3, 'cms_id' => 1]
        ];

        foreach($fieldTypes as $type) {
            FieldType::create($type);
        }
    }
}

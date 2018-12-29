<?php

use App\Module;
use Illuminate\Database\Seeder;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Module::truncate();
        Module::unguard();

        $modules = [
            ['id' => 1, 'name' => 'Paragraphs', 'cms_id' => 1],
            ['id' => 2, 'name' => 'Geolocation', 'cms_id' => 1],
            ['id' => 3, 'name' => 'Metatag', 'cms_id' => 1],
        ];

        Module::insert($modules);

    }
}

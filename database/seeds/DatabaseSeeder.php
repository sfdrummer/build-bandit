<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CmsTableSeeder::class);
        $this->call(TypesTableSeeder::class);
        $this->call(FieldTypesSeeder::class);
        $this->call(ModulesSeeder::class);
    }
}

<?php

use App\Type;
use Illuminate\Database\Seeder;

class TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Type::query()->truncate();

        $types = [
            ['cms_id' => 1, 'name' => 'Content type'],
            ['cms_id' => 1, 'name' => 'User'],
            ['cms_id' => 1, 'name' => 'Taxonomy'],
        ];

        Type::insert($types);
    }
}

<?php

use App\Cms;
use Illuminate\Database\Seeder;

class CmsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cms::query()->truncate();

        $cms = [
            ['name' => 'Drupal', 'description' => 'The leading open-source CMS for ambitious digital experiences that reach your audience across multiple channels.'],
            ['name' => 'CraftCMS', 'description' => 'The CMS that makes the whole team happy.'],
            ['name' => 'Wordpress', 'description' => 'Open source software you can use to create a beautiful website, blog, or app.']
        ];

        Cms::insert($cms);
    }
}

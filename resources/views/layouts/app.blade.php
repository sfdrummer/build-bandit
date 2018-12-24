<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script src="{{ asset('js/app.js') }}" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,700,800" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

  <!-- Styles -->
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="border-t-8 border-grey-dark bg-grey-lighter" style="font-family: 'Fira sans';">
  <header class="text-grey-darker bg-grey-lightest px-8">
    <div class="container mx-auto py-8 flex items-center justify-between">
      <h1 class="font-light tracking-wide">
        <i class="fas fa-hammer"></i> BuildBandit
      </h1>
      <ul class="flex items-center list-reset">
        <li class="mr-12">
          <a href="/projects" class="text-grey-darkest no-underline">All Projects</a>
        </li>
        <li class="mr-12">
          <a href="/types" class="text-grey-darkest no-underline">Types</a>
        </li>
        <li class="mr-12">
          <a href="/fields" class="text-grey-darkest no-underline">Fields</a>
        </li>
      </ul>
    </div>
  </header>

  @yield('postHeader')

  <main class="py-4 px-8 mt-16">
    @yield('content')
  </main>
</div>
</body>
</html>

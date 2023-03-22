{
  "targets": [
    {
      "target_name": "ex_util",
      "sources": [
        "apps/embedded/c++/util.c"
      ]
    },
  ],
  "include_dirs": [
    "<!@(node -p \"require('node-addon-api').include\")"
  ],
  "dependencies": [
    "<!(node -p \"require('node-addon-api').gyp\")"
  ],
  "cflags!": [ "-fno-exceptions" ],
  "cflags_cc!": [ "-fno-exceptions" ],
}
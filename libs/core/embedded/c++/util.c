// addon_node.c
#include <node_api.h>
#include "common.h"

static napi_value
DoSomethingUseful(napi_env env, napi_callback_info info)
{
    // Do something useful.
    return NULL;
}

napi_value create_addon(napi_env env)
{
    napi_value result;
    NAPI_CALL(env, napi_create_object(env, &result));

    napi_value exported_function;
    NAPI_CALL(env, napi_create_function(env,
                                        "doSomethingUseful",
                                        NAPI_AUTO_LENGTH,
                                        DoSomethingUseful,
                                        NULL,
                                        &exported_function));

    NAPI_CALL(env, napi_set_named_property(env,
                                           result,
                                           "doSomethingUseful",
                                           exported_function));

    return result;
}

NAPI_MODULE_INIT()
{
    // This function body is expected to return a `napi_value`.
    // The variables `napi_env env` and `napi_value exports` may be used within
    // the body, as they are provided by the definition of `NAPI_MODULE_INIT()`.
    return create_addon(env);
}
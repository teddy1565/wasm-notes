#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char g_str[] = "hello world";

int getStrLen() {
    return strlen(g_str);
}

char* getStr() {
    return g_str;
}
#include <stdio.h>
#include <stdlib.h>

typedef struct list{
    int number;
    struct list *prev;
    struct list *next;
} list;

int getListNodeLength() {
    return sizeof(list);
}

int getNodeValue(list *node) {
    return node->number;
}

list *genrateListNode(int num) {
    list *node = (list*)malloc(sizeof(list));
    node->next = NULL;
    node->prev = NULL;
    node->number = num;
    return node;
}

int main() {
    return 0;
}
from rest_framework.pagination import PageNumberPagination


class BasePagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "limit"
    max_page_size = 100


class LargePagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "limit"
    max_page_size = 100

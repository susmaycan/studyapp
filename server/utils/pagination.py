from rest_framework.pagination import PageNumberPagination, Response


class BasePagination(PageNumberPagination):
    page_size = 14
    page_size_query_param = "limit"
    max_page_size = 100
    page_query_param = "page"

    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.page.next_page_number() if self.page.has_next() else None,
                "previous": (
                    self.page.previous_page_number()
                    if self.page.has_previous()
                    else None
                ),
                "count": self.page.paginator.count,
                "results": data,
            }
        )


class LargePagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = "limit"
    max_page_size = 100

from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class VisaRefusals(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        
        query = """
        INSERT INTO VisaRefusals (PersionId, country, reason_for_rejection, type_of_visa, additional_comments)
        VALUES (%s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersionId')
                    country = data.get('country')
                    reason_for_rejection = data.get('reason')
                    type_of_visa = data.get('type')
                    additional_comments = data.get('comments')
                    data = (person_id, country, reason_for_rejection, type_of_visa, additional_comments)
                    cursor.execute(query, data)
                connection.commit()
            return JsonResponse({"message": "Visa refusal information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class TravelHistory(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        
        query = """
        INSERT INTO TravelHistory (PersionId, country, location, purpose, from_date, to_date)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersionId')
                    country = data.get('country')
                    location = data.get('location')
                    purpose = data.get('purpose')
                    from_date = data.get('fromDate')
                    to_date = data.get('toDate')
                    data = (person_id, country, location, purpose, from_date, to_date)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Travel history information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

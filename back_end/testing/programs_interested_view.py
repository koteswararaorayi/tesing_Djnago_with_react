from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class InterestedPrograms(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)        
        
        query = """
        INSERT INTO interested_programs (PersonId, stream, duration, location, additional_comments)
        VALUES (%s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersonId')
                    stream = data.get('stream')
                    duration = data.get('duration')
                    location = data.get('location')
                    additional_comments = data.get('comments')
                    data = (person_id, stream, duration, location, additional_comments)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Interested program information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

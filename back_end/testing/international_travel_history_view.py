from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class TravelHistory(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """
        INSERT INTO TravelHistory (PersionId, country, location, purpose, from_date, to_date, created_by)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
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
                    data = (person_id, country, location, purpose, from_date, to_date, user_id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Travel history information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM TravelHistory WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                travel_history =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':travel_history},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def put(self, request):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """ 
            update TravelHistory set country=%s, location=%s, purpose=%s, from_date=%s, to_date=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    _id = data.get('id')
                    country = data.get('country')
                    location = data.get('location')
                    purpose = data.get('purpose')
                    from_date = data.get('fromDate')
                    to_date = data.get('toDate')
                    data = ( country, location, purpose, from_date, to_date, user_id, _id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

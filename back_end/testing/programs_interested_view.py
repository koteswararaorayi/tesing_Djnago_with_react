from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class InterestedPrograms(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        user_id = request.user.id
        print(data_list)        
        
        query = """
        INSERT INTO interested_programs (PersonId, stream, duration, location, additional_comments, created_by)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersonId')
                    stream = data.get('stream')
                    duration = data.get('duration')
                    location = data.get('location')
                    additional_comments = data.get('comments')
                    data = (person_id, stream, duration, location, additional_comments, user_id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Interested program information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM interested_programs WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                interested_programs =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':interested_programs},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def put(self, request):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """ 
            update interested_programs set stream=%s, duration=%s, location=%s, additional_comments=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    _id = data.get('id')
                    stream = data.get('stream')
                    duration = data.get('duration')
                    location = data.get('location')
                    additional_comments = data.get('comments')
                    data = (stream, duration, location, additional_comments, user_id, _id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
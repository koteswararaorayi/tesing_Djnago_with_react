from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class WorkExperience(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """
        INSERT INTO WorkExperience (PersionId, designation, company_name, location, duration_start, duration_end, created_by)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersionId')
                    designation = data.get('designation')
                    company_name = data.get('companyName')
                    location = data.get('location')
                    duration_start = data.get('startDate')
                    duration_end = data.get('endDate')
                    data = (person_id, designation, company_name, location, duration_start, duration_end, user_id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM WorkExperience WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                work_experience =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':work_experience},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def put(self, request):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """ 
            update WorkExperience set designation=%s, company_name=%s, location=%s, duration_start=%s, duration_end=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    _id = data.get('id')
                    designation = data.get('designation')
                    company_name = data.get('companyName')
                    location = data.get('location')
                    duration_start = data.get('startDate')
                    duration_end = data.get('endDate')
                    data = (designation, company_name, location, duration_start, duration_end, user_id, _id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class CanadaImmigrationInfo(APIView):
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        print(data)
        user_id = request.user.id
        person_id = data.get('PersionId')
        biometrics_given = data.get('biometricsGiven')
        biometrics_date = data.get('biometricsDate')
        medicals_given = data.get('medicalsGiven')
        medicals_date = data.get('medicalsDate')
        data = (person_id, biometrics_given, biometrics_date, medicals_given, medicals_date, user_id)
        query = """
        INSERT INTO CanadaImmigrationInfo (PersionId, biometrics_given, biometrics_date, medicals_given, medicals_date, created_by)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Canada immigration information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM CanadaImmigrationInfo WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                canada_immigration_info =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':canada_immigration_info},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def put(self, request):
        data = JSONParser().parse(request)
        print(data)
        user_id = request.user.id
        _id = data.get('id')
        biometrics_given = data.get('biometricsGiven')
        biometrics_date = data.get('biometricsDate')
        medicals_given = data.get('medicalsGiven')
        medicals_date = data.get('medicalsDate')
        data = ( biometrics_given, biometrics_date, medicals_given, medicals_date, user_id, _id)
        query = """ 
            update CanadaImmigrationInfo set biometrics_given=%s, biometrics_date=%s, medicals_given=%s, medicals_date=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

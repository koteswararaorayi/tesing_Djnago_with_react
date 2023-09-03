from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class CanadaImmigrationInfo(APIView):
    def post(self, request, format=None):
        data = JSONParser().parse(request)
        print(data)
        person_id = data.get('PersionId')
        biometrics_given = data.get('biometricsGiven')
        biometrics_date = data.get('biometricsDate')
        medicals_given = data.get('medicalsGiven')
        medicals_date = data.get('medicalsDate')
        data = (person_id, biometrics_given, biometrics_date, medicals_given, medicals_date)
        query = """
        INSERT INTO CanadaImmigrationInfo (PersionId, biometrics_given, biometrics_date, medicals_given, medicals_date)
        VALUES (%s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Canada immigration information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

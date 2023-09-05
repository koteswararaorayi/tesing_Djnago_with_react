from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class EmergencyContact(APIView):
    def post(self, request, format=None):
        # data = JSONParser().parse(request)
        user_id = request.user.id
        person_id = request.data.get('PersionId')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        full_address = request.data.get('address')
        postal_zipcode = request.data.get('postal_zipcode')
        email = request.data.get('email')
        phone_number = request.data.get('phoneNumber')
        relation = request.data.get('relation')
        data = (person_id, first_name, last_name, full_address, postal_zipcode, email, phone_number, relation, user_id)
        query = """
            INSERT INTO EmergencyContact (PersionId, first_name, last_name, full_address, postal_zipcode, email, phone_number, relation, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Emergency contact inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM EmergencyContact WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                emergency_contact =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':emergency_contact},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def put(self, request):
        user_id = request.user.id
        _id = request.data.get('id')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        full_address = request.data.get('address')
        postal_zipcode = request.data.get('postal_zipcode')
        email = request.data.get('email')
        phone_number = request.data.get('phoneNumber')
        relation = request.data.get('relation')
        data = (first_name, last_name, full_address, postal_zipcode, email, phone_number, relation, user_id, _id,)
        
        query = """ 
            update EmergencyContact set first_name=%s, last_name=%s, full_address=%s, postal_zipcode=%s, email=%s, phone_number=%s, 
            relation=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
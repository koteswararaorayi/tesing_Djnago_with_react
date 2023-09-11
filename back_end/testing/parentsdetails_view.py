from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class FamilyInformation(APIView):
    def post(self, request, format=None):
        print(request.data)
        user_id = request.user.id
        father_name = request.data.get('fatherName')
        father_dob = request.data.get('fatherDOB')
        father_address = request.data.get('fatherAddress')
        father_occupation = request.data.get('fatherOccupation')
        father_annual_income = request.data.get('fatherIncome')
        mother_name = request.data.get('motherName')
        mother_dob = request.data.get('motherDOB')
        mother_address = request.data.get('motherAddress')
        mother_occupation = request.data.get('motherOccupation')
        mother_annual_income = request.data.get('motherIncome')
        mother_dod = request.data.get('motherDateOfDeath')
        father_dod = request.data.get('fatherDateOfDeath')
        data = ( father_name, father_dob, father_address, father_occupation,father_annual_income, mother_name, 
            mother_dob, mother_address, mother_occupation,mother_annual_income, mother_dod, father_dod, user_id)
        query = """
            INSERT INTO FamilyInformation ( father_name, father_dob, father_address, father_occupation, father_annual_income, 
            mother_name, mother_dob, mother_address, mother_occupation, mother_annual_income, mother_dod, father_dod, 
            created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                connection.commit()
            return JsonResponse({"message": "Family information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
            user_id = request.user.id
            try:
                query = """
                SELECT * FROM FamilyInformation WHERE created_by = %s
                """
                with connection.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    result = cursor.fetchall()                            
                    columns = [col[0] for col in cursor.description]                
                    family_information =  [dict(zip(columns, row)) for row in result]                             
                    cursor.close()
                return JsonResponse({'data':family_information},status=status.HTTP_200_OK, safe=False)
                
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user_id = request.user.id
        _id = request.data.get('id')
        father_name = request.data.get('fatherName')
        father_dob = request.data.get('fatherDOB')
        father_address = request.data.get('fatherAddress')
        father_occupation = request.data.get('fatherOccupation')
        father_annual_income = request.data.get('fatherIncome')
        mother_name = request.data.get('motherName')
        mother_dob = request.data.get('motherDOB')
        mother_address = request.data.get('motherAddress')
        mother_occupation = request.data.get('motherOccupation')
        mother_annual_income = request.data.get('motherIncome')
        mother_dod = request.data.get('motherDateOfDeath')
        father_dod = request.data.get('fatherDateOfDeath')
        data = ( father_name, father_dob, father_address, father_occupation,father_annual_income, mother_name, 
            mother_dob, mother_address, mother_occupation,mother_annual_income, mother_dod, father_dod, user_id, _id)
        
        query = """ 
            update FamilyInformation set father_name=%s, father_dob=%s, father_address=%s, father_occupation=%s, father_annual_income=%s, 
            mother_name=%s, mother_dob=%s, mother_address=%s, mother_occupation=%s, mother_annual_income=%s, mother_dod=%s,
            father_dod=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
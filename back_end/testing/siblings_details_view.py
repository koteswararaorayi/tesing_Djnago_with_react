from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class SiblingInformation(APIView):
    def post(self, request, format=None):
        #data = JSONParser().parse(request)
        print(request.data)
        user_id = request.user.id
        query = """
            INSERT INTO SiblingInformation (PersionId, relation, sibling_name, sibling_dob, sibling_marital_status,
                sibling_address, sibling_occupation, sibling_annual_income, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in request.data:
                    person_id = data.get('PersionId')
                    relation = data.get('relation')
                    sibling_name = data.get('siblingName')
                    sibling_dob = data.get('siblingDOB')
                    sibling_marital_status = data.get('maritalStatus')
                    sibling_address = data.get('address')
                    sibling_occupation = data.get('siblingOccupation')
                    sibling_annual_income = data.get('siblingIncome')
                    data = (person_id, relation, sibling_name, sibling_dob, sibling_marital_status,sibling_address, 
                        sibling_occupation, sibling_annual_income, user_id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Sibling information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM SiblingInformation WHERE created_by = %s
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
            update SiblingInformation set relation=%s, sibling_name=%s, sibling_dob=%s, sibling_marital_status=%s, 
            sibling_address=%s, sibling_occupation=%s, sibling_annual_income=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    _id = data.get('id')
                    relation = data.get('relation')
                    sibling_name = data.get('siblingName')
                    sibling_dob = data.get('siblingDOB')
                    sibling_marital_status = data.get('maritalStatus')
                    sibling_address = data.get('address')
                    sibling_occupation = data.get('siblingOccupation')
                    sibling_annual_income = data.get('siblingIncome')
                    data = (relation, sibling_name, sibling_dob, sibling_marital_status,sibling_address, 
                        sibling_occupation, sibling_annual_income, user_id, _id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
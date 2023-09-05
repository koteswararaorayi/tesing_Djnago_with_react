from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class VisaRefusals(APIView):
    def post(self, request, format=None):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """
        INSERT INTO VisaRefusals (PersionId, country, reason_for_rejection, type_of_visa, additional_comments, created_by)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    person_id = data.get('PersionId')
                    country = data.get('country')
                    reason_for_rejection = data.get('reason')
                    type_of_visa = data.get('type')
                    additional_comments = data.get('comments')
                    data = (person_id, country, reason_for_rejection, type_of_visa, additional_comments, user_id)
                    cursor.execute(query, data)
                connection.commit()
            return JsonResponse({"message": "Visa refusal information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """
            SELECT * FROM VisaRefusals WHERE created_by = %s
            """
            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()                            
                columns = [col[0] for col in cursor.description]                
                visa_refusals =  [dict(zip(columns, row)) for row in result]                             
                cursor.close()
            return JsonResponse({'data':visa_refusals},status=status.HTTP_200_OK, safe=False)
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def put(self, request):
        data_list = JSONParser().parse(request)
        print(data_list)
        user_id = request.user.id
        query = """ 
            update VisaRefusals set country=%s, reason_for_rejection=%s, type_of_visa=%s, additional_comments=%s, updated_by=%s
            where id=%s 
        """
            
        try:
            with connection.cursor() as cursor:
                for data in data_list:
                    _id = data.get('id')
                    country = data.get('country')
                    reason_for_rejection = data.get('reason')
                    type_of_visa = data.get('type')
                    additional_comments = data.get('comments')
                    data = (country, reason_for_rejection, type_of_visa, additional_comments, user_id, _id)
                    cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Work experience information inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
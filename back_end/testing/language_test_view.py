from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse

class LanguageTestScore(APIView):
    def post(self, request, format=None):
        user_id = request.user.id
        person_id = request.data.get('person_id')
        exam_type = request.data.get('testType')
        category = request.data.get('category')
        listening = request.data.get('listening')
        reading = request.data.get('reading')
        writing = request.data.get('writing')
        speaking = request.data.get('speaking')
        overallScore = request.data.get('overallScore')
        date_of_test = request.data.get('dateOfTest')
        date_of_result = request.data.get('dateOfResult')
        data = (person_id, exam_type, category, listening, reading, writing, speaking, overallScore, date_of_test, date_of_result, user_id)
        try:
            query = """
                INSERT INTO test_score (person_id, ExamType, Category, Listening, Reading, Writing, Speaking, OverAllScore, DateOfTest, DateOfResult, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """        
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Test score inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_id = request.user.id
        try:
            query = """ 
            SELECT * FROM test_score WHERE created_by=%s"""

            with connection.cursor() as cursor:
                cursor.execute(query, (user_id,))
                result = cursor.fetchall()

                columns = [col[0] for col in cursor.description]
                data = [dict(zip(columns, row)) for row in result]
                cursor.close()

            return JsonResponse({"data": data[0]},status=status.HTTP_200_OK, safe=False)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        _id = request.data.get("id")
        print(_id)
        user = request.user
        user_id = user.id
        # Assuming you have a person_id to identify the record
        exam_type = request.data.get("testType")
        category = request.data.get("category")
        listening = request.data.get("listening")
        reading = request.data.get("reading")
        writing = request.data.get("writing")
        speaking = request.data.get("speaking")
        overall_score = request.data.get("overallScore")
        date_of_test = request.data.get("dateOfTest")
        date_of_result = request.data.get("dateOfResult")

        # Use a raw SQL query to update the record
        query = """
            UPDATE test_score
            SET ExamType = %s, Category = %s, Listening = %s, Reading = %s,
                Writing = %s, Speaking = %s, OverAllScore = %s,
                DateOfTest = %s, DateOfResult = %s,updated_by = %s
            WHERE id = %s
        """
        data = (
            exam_type,
            category,
            listening,
            reading,
            writing,
            speaking,
            overall_score,
            date_of_test,
            date_of_result,
            user_id,
            _id,
        )
        print(data)
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()

            return JsonResponse(
                {"message": "Test score updated successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
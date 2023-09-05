from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse

class LanguageTestScore(APIView):
    def post(self, request, format=None):
        print (request.data)
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
        data = (person_id, exam_type, category, listening, reading, writing, speaking, overallScore, date_of_test, date_of_result)
        try:
            query = """
                INSERT INTO test_score (person_id, ExamType, Category, Listening, Reading, Writing, Speaking, OverAllScore, DateOfTest, DateOfResult)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """        
            with connection.cursor() as cursor:
                cursor.execute(query, data)
                cursor.close()
            return JsonResponse({"message": "Test score inserted successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

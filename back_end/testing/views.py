from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse
from django.http import HttpResponseServerError

# Create your views here.
class RegisterUser(APIView):
    def post (self, request):
        print(request.data)
        name = request.data['name']
        email = request.data['email']
        phoneNumber = request.data['phoneNumber']
        try:
            query = f""" insert into  testing  values('{name}', '{email}', '{phoneNumber}')"""
            print(query)
            with connection.cursor() as cursor:
                cursor.execute(query)
                cursor.close()
            
            return JsonResponse({'message': "data successfully added"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            error_message = f"An unexpected error occurred: {e}"
            return HttpResponseServerError(error_message)



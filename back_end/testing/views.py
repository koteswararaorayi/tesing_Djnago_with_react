from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from django.http import JsonResponse
from django.http import HttpResponseServerError
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import AllowAny

# Create your views here.
class RegisterUser(APIView):
    permission_classes = [AllowAny]
    def post (self, request):
        print(request.data)
        name = request.data['name']
        email = request.data['email']
        password = make_password(request.data['password'])
        data =(name, email, password)
        try:
            query = """ insert into  users (name, email, password) 
            values(%s, %s, %s)"""
            print(query)
            with connection.cursor() as cursor:
                cursor.execute(query,data)
                cursor.close()
            
            return JsonResponse({'message': "user created successfully "}, status=status.HTTP_201_CREATED)

        except Exception as e:
            error_message = f"An unexpected error occurred: {e}"
            return HttpResponseServerError(error_message)

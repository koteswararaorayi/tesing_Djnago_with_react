from django.db import connection
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status

class EducationalDetails(APIView):
    def post(self, request, format=None):
        user_id = request.user.id
        print(request.data['postGraduationData'])
        data = request.data
        skip_education_levels = []

        for key, education_data in data.items():
            education_level = education_data['educationLevel']
            if not education_data['institutionName']:
                # Mark this education level to be skipped
                skip_education_levels.append(education_level)
            else:
                # Construct the SQL query
                query = """
                INSERT INTO EducationHistory (education_level, institution_name, address, course_name, grade_percentage,
                backlogs, number_of_backlogs, duration_start, duration_end, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
                
                # Extract values from the dictionary
                values = (
                    education_level,
                    education_data['institutionName'],
                    education_data['address'],
                    education_data['courseName'],
                    education_data['gradePercentage'],
                    education_data['hasBacklogs'],
                    education_data['numberOfBacklogs'],
                    education_data['durationStart'],
                    education_data['durationEnd'],
                    user_id
                )
                
                try:
                    with connection.cursor() as cursor:
                        cursor.execute(query, values)
                        cursor.close()
                    print(f"Data for '{education_level}' inserted successfully")
                except Exception as e:
                    print(f"Error inserting data for '{education_level}': {str(e)}")
        print(f"Skipped education levels: {', '.join(skip_education_levels)}")
        return JsonResponse({"message": "Educational Details inserted successfully"}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
            user_id = request.user.id
            try:
                query = """
                SELECT * FROM EducationHistory WHERE created_by = %s
                """
                with connection.cursor() as cursor:
                    cursor.execute(query, (user_id,))
                    result = cursor.fetchall()                            
                    columns = [col[0] for col in cursor.description]                
                    educational_details =  [dict(zip(columns, row)) for row in result]                             
                    cursor.close()
                return JsonResponse({'data':educational_details},status=status.HTTP_200_OK, safe=False)
                
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
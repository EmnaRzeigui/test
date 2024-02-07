from django.shortcuts import render
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from myproject import settings 
import json

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        to_email = data.get('to')
        subject = data.get('subject')
        body = data.get('body')
        
        try:
            send_mail(subject, body, settings.EMAIL_HOST_USER , [to_email])
            print (subject, body , to_email)
            return JsonResponse({'success': True, 'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed'})

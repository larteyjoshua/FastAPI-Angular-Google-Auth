import random
from loguru import logger


def generate_student_list(num_students):
    logger.info("Generating student Data")
    names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack',
             'Katherine', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Samuel', 'Taylor']
    classes = ['Math', 'Science', 'English', 'History', 'Art']
    foods = ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sushi']
    colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple']

    student_list = []
    for _ in range(num_students):
        name = random.choice(names)
        class_ = random.choice(classes)
        age = random.randint(10, 18)
        favorite_food = random.choice(foods)
        favorite_color = random.choice(colors)

        student = {
            'name': name,
            'class_': class_,
            'age': age,
            'favorite_food': favorite_food,
            'favorite_color': favorite_color
        }

        student_list.append(student)

    return student_list

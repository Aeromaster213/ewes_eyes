import os


async def save_text(text, filename, folder_path="texts"):
    """
    Saves text content to a file in the specified folder.

    Args:
        text (str): The text content to save.
        filename (str): The desired filename for the saved text.
        folder_path (str, optional): The path to the folder where the text
                                     file will be saved. Defaults to "texts".
    """

    # Create the folder if it doesn't exist
    os.makedirs(folder_path, exist_ok=True)  
    full_file_path = os.path.join(folder_path, filename)

    try:
        with open(full_file_path, "w") as text_file:
            text_file.write(text)
        print(f'Text saved successfully to {full_file_path}')
    except Exception as e:
        print(f'Error saving text: {e}')
        raise e

# Example usage (assuming you have a text variable called "my_text")
# await save_text(my_text, "my_saved_text.txt")  # Saves to "texts/my_saved_text.txt"

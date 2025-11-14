#!/usr/bin/env python3
"""
Enhanced script to convert team members CSV to JSON format
Handles the specific format shown in the spreadsheet
"""

import csv
import json
import sys
import os

def clean_url(url):
    """Clean and format URLs properly"""
    if not url or url.strip() == '':
        return None
    
    url = url.strip()
    if not url.startswith('http'):
        url = f"https://{url}"
    return url

def convert_team_csv_to_json(csv_file_path, json_output_path=None):
    """
    Convert team CSV to JSON format matching the React component structure
    """
    
    if json_output_path is None:
        json_output_path = "/home/prashant/Documents/mathsoc-site/html/mathsoc-react/src/data/teamMembers.json"
    
    team_members = []
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            for row_num, row in enumerate(reader, start=2):  # Start from 2 since row 1 is header
                # Skip empty rows
                name = row.get('name', '').strip()
                if not name:
                    continue
                
                position = row.get('position', '').strip()
                if not position:
                    print(f"⚠️  Row {row_num}: No position for {name}, skipping")
                    continue
                
                # Create base member object
                member = {
                    "name": name,
                    "position": position,
                    "image": row.get('image', '').strip() or f"/img/team/{name.lower().replace(' ', '_')}.jpg"
                }
                
                # Handle social media links
                social = {}
                
                # Email
                email = row.get('email', '').strip()
                if email:
                    social['email'] = email
                
                # LinkedIn
                linkedin = row.get('linkedin', '').strip()
                linkedin_clean = clean_url(linkedin)
                if linkedin_clean:
                    social['linkedin'] = linkedin_clean
                
                # Instagram  
                instagram = row.get('instagram', '').strip()
                instagram_clean = clean_url(instagram)
                if instagram_clean:
                    social['instagram'] = instagram_clean
                
                # Facebook (if exists in your data)
                facebook = row.get('facebook', '').strip()
                facebook_clean = clean_url(facebook)
                if facebook_clean:
                    social['facebook'] = facebook_clean
                
                # Only add social object if it has any content
                if social:
                    member['social'] = social
                
                team_members.append(member)
                print(f"✓ Added: {name} - {position}")
        
        # Sort team members by position hierarchy
        position_order = {
            'Overall Coordinator': 1,
            'Coordinator': 2, 
            'Panel Member': 3,
            'Convenor': 4,
            'Convener': 4,  # Alternative spelling
            'Executive': 5
        }
        
        team_members.sort(key=lambda x: position_order.get(x['position'], 99))
        
        # Write JSON file
        with open(json_output_path, 'w', encoding='utf-8') as jsonfile:
            json.dump(team_members, jsonfile, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Successfully converted {len(team_members)} team members")
        print(f"📁 Input CSV: {csv_file_path}")
        print(f"📄 Output JSON: {json_output_path}")
        
        # Show preview
        if team_members:
            print(f"\n📊 Preview of first team member:")
            print(json.dumps(team_members[0], indent=2))
        
        return team_members
        
    except FileNotFoundError:
        print(f"❌ Error: CSV file not found: {csv_file_path}")
        return None
    except Exception as e:
        print(f"❌ Error converting CSV to JSON: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("🔄 Team Members CSV to JSON Converter")
    print("=" * 40)
    
    # Get CSV file path from command line argument or use default
    if len(sys.argv) > 1:
        csv_file = sys.argv[1]
    else:
        # Look for CSV files in the workspace
        csv_files = []
        workspace_root = "/home/prashant/Documents/mathsoc-site/html"
        
        # Check common locations
        potential_paths = [
            os.path.join(workspace_root, "events.csv"),
            os.path.join(workspace_root, "team.csv"),
            os.path.join(workspace_root, "team_members.csv"),
        ]
        
        # Also check current directory
        for file in os.listdir('.'):
            if file.endswith('.csv'):
                potential_paths.append(os.path.abspath(file))
        
        # Find existing CSV files
        existing_csvs = [path for path in potential_paths if os.path.exists(path)]
        
        if not existing_csvs:
            print("❌ No CSV file found!")
            print("Usage: python csv_to_json_converter.py <path_to_csv_file>")
            print(f"Or place a CSV file in: {workspace_root}")
            return
        
        if len(existing_csvs) == 1:
            csv_file = existing_csvs[0]
            print(f"📁 Found CSV file: {csv_file}")
        else:
            print("🔍 Multiple CSV files found:")
            for i, path in enumerate(existing_csvs, 1):
                print(f"  {i}. {path}")
            
            try:
                choice = int(input("Select CSV file (number): ")) - 1
                csv_file = existing_csvs[choice]
            except (ValueError, IndexError):
                print("❌ Invalid selection")
                return
    
    # Convert the file
    if os.path.exists(csv_file):
        result = convert_team_csv_to_json(csv_file)
        if result:
            print("\n✨ Conversion successful!")
            print("🚀 Your React component will now use the updated team data!")
        else:
            print("\n❌ Conversion failed!")
    else:
        print(f"❌ CSV file not found: {csv_file}")

if __name__ == "__main__":
    main()